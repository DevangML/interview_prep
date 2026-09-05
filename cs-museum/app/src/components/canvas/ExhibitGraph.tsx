import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three/webgpu';
import { useMuseumStore, type ConceptEdge, type ConceptNode } from '../../store/useMuseumStore';

const GEOMETRIES: Record<string, THREE.BufferGeometry> = {
  RoundedBox: new THREE.BoxGeometry(1.2, 1.2, 1.2, 4, 4, 4),
  Cylinder: new THREE.CylinderGeometry(0.7, 0.7, 1.2, 32),
  Octahedron: new THREE.OctahedronGeometry(1),
  Icosahedron: new THREE.IcosahedronGeometry(1),
  Dodecahedron: new THREE.DodecahedronGeometry(1),
  Tetrahedron: new THREE.TetrahedronGeometry(1),
  Torus: new THREE.TorusGeometry(0.7, 0.3, 16, 64),
  Capsule: new THREE.CapsuleGeometry(0.5, 1, 16, 32),
  Box: new THREE.BoxGeometry(1.2, 1.2, 1.2),
  Sphere: new THREE.SphereGeometry(0.9, 32, 32),
};

const hitboxGeometry = new THREE.SphereGeometry(2.5, 8, 8);
const dummy = new THREE.Object3D();
const scratchColor = new THREE.Color();

type TextSpriteProps = {
  text: string;
  fontSize?: number;
  color?: string;
  scale?: number;
  position: [number, number, number];
  opacity?: number;
};

const TextSprite = memo(({ text, fontSize = 42, color = '#ffffff', scale = 1, position, opacity = 1 }: TextSpriteProps) => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 8;
    ctx.fillStyle = color;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = false;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }, [text, fontSize, color]);

  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <sprite position={position} scale={[scale * 16, scale * 4, 1]}>
      <spriteNodeMaterial map={texture} transparent opacity={opacity} depthTest={false} />
    </sprite>
  );
});

const CameraController = () => {
  const { camera } = useThree();
  const lightRef = useRef<THREE.PointLight>(null);
  const targetY = useRef(140);
  const mouseX = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      targetY.current -= e.deltaY * 0.15;
      targetY.current = Math.max(-80, Math.min(160, targetY.current));
    };

    const handlePointer = (e: PointerEvent) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1;
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('pointermove', handlePointer, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('pointermove', handlePointer);
    };
  }, []);

  useFrame(() => {
    const tX = mouseX.current * 15;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, tX, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 65, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY.current, 0.08);
    camera.lookAt(0, camera.position.y, 0);
    lightRef.current?.position.copy(camera.position);
  });

  return <pointLight ref={lightRef} intensity={2} color="#ffffff" distance={150} />;
};

const NodeHitbox = memo(
  ({
    node,
    hovered,
    onHover,
  }: {
    node: ConceptNode;
    hovered: boolean;
    onHover: (id: string | null) => void;
  }) => {
    const isActive = useMuseumStore((s) => s.activeConceptId === node.id);
    const selectConcept = useMuseumStore((s) => s.selectConcept);
    const showLabel = isActive || hovered;

    return (
      <group position={node.position}>
        <mesh
          geometry={hitboxGeometry}
          visible={false}
          onClick={(e) => {
            e.stopPropagation();
            selectConcept(node.id);
          }}
          onPointerOver={() => {
            onHover(node.id);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            onHover(null);
            document.body.style.cursor = 'auto';
          }}
        />
        {showLabel && (
          <TextSprite
            text={node.label}
            position={[0, -2.5, 0]}
            scale={1.2}
            color={isActive ? '#38bdf8' : '#ffffff'}
          />
        )}
      </group>
    );
  },
);

const InstancedShapeGroup = memo(({ geometry, nodes }: { geometry: THREE.BufferGeometry; nodes: ConceptNode[] }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const activeId = useMuseumStore((s) => s.activeConceptId);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh || nodes.length === 0) return;

    nodes.forEach((node, i) => {
      const scale = node.id === activeId ? 1.6 : node.id === hoveredId ? 1.2 : 1;
      dummy.position.set(node.position[0], node.position[1], node.position[2]);
      dummy.scale.setScalar(scale);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      scratchColor.set(node.id === activeId ? '#ffffff' : node.color || '#cbd5e1');
      mesh.setColorAt(i, scratchColor);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [nodes, activeId, hoveredId]);

  if (nodes.length === 0) return null;

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[geometry, undefined, nodes.length]}
        frustumCulled={false}
        raycast={() => null}
      >
        <meshStandardNodeMaterial color="#ffffff" roughness={0.25} metalness={0.35} transparent opacity={0.92} />
      </instancedMesh>
      {nodes.map((node) => (
        <NodeHitbox key={node.id} node={node} hovered={hoveredId === node.id} onHover={setHoveredId} />
      ))}
    </group>
  );
});

const ShapesInstancedGroup = memo(({ nodes }: { nodes: ConceptNode[] }) => {
  const nodesByShape = useMemo(() => {
    const groups: Record<string, ConceptNode[]> = {};
    nodes.forEach((node) => {
      if (node.isLayer) return;
      const shape = node.shape || 'Sphere';
      if (!groups[shape]) groups[shape] = [];
      groups[shape].push(node);
    });
    return groups;
  }, [nodes]);

  return (
    <>
      {Object.entries(nodesByShape).map(([shape, shapeNodes]) => (
        <InstancedShapeGroup key={shape} geometry={GEOMETRIES[shape] || GEOMETRIES.Sphere} nodes={shapeNodes} />
      ))}
    </>
  );
});

const MacroLayers = memo(({ nodes }: { nodes: ConceptNode[] }) => (
  <>
    {nodes
      .filter((n) => n.isLayer)
      .map((node) => (
        <group key={node.id} position={node.position}>
          <TextSprite
            text={node.label.toUpperCase()}
            position={[0, 0, -2]}
            scale={3.5}
            color="#ffffff"
            opacity={0.15}
            fontSize={48}
          />
        </group>
      ))}
  </>
));

const EdgeHitbox = memo(
  ({
    edge,
    sourcePos,
    targetPos,
  }: {
    edge: ConceptEdge;
    sourcePos: [number, number, number];
    targetPos: [number, number, number];
  }) => {
    const isActive = useMuseumStore((s) => s.activeEdgeId === edge.id);
    const selectEdge = useMuseumStore((s) => s.selectEdge);
    const [hovered, setHovered] = useState(false);

    const color = edge.color || '#d946ef';
    const mid: [number, number, number] = [
      (sourcePos[0] + targetPos[0]) / 2,
      (sourcePos[1] + targetPos[1]) / 2,
      (sourcePos[2] + targetPos[2]) / 2,
    ];
    const showLabel = isActive || hovered;

    const highlightGeo = useMemo(() => {
      if (!isActive && !hovered) return null;
      const geo = new THREE.BufferGeometry();
      geo.setFromPoints([
        new THREE.Vector3(sourcePos[0], sourcePos[1], sourcePos[2]),
        new THREE.Vector3(targetPos[0], targetPos[1], targetPos[2]),
      ]);
      return geo;
    }, [hovered, isActive, sourcePos, targetPos]);

    useEffect(() => () => highlightGeo?.dispose(), [highlightGeo]);

    return (
      <group>
        {highlightGeo && (
          <lineSegments geometry={highlightGeo}>
            <lineBasicNodeMaterial color={isActive ? '#ffffff' : color} />
          </lineSegments>
        )}
        {showLabel && edge.label && (
          <TextSprite text={`↓ ${edge.label}`} position={mid} scale={1.0} color={color} />
        )}
        <mesh
          position={mid}
          onClick={(e) => {
            e.stopPropagation();
            selectEdge(edge.id);
          }}
          onPointerOver={() => {
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
          visible={false}
        >
          <sphereGeometry args={[2, 8, 8]} />
          <meshBasicNodeMaterial />
        </mesh>
      </group>
    );
  },
);

function buildLineGeometry(
  edges: ConceptEdge[],
  nodeMap: Map<string, ConceptNode>,
  predicate: (edge: ConceptEdge) => boolean,
  withColors: boolean,
) {
  const pts: number[] = [];
  const colors: number[] = [];
  edges.forEach((edge) => {
    if (!predicate(edge)) return;
    const source = nodeMap.get(edge.source);
    const target = nodeMap.get(edge.target);
    if (!source || !target) return;
    pts.push(...source.position, ...target.position);
    if (withColors) {
      scratchColor.set(edge.color || '#d946ef');
      colors.push(scratchColor.r, scratchColor.g, scratchColor.b, scratchColor.r, scratchColor.g, scratchColor.b);
    }
  });
  if (pts.length < 6) return null;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  if (withColors) geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  return geo;
}

export const ExhibitGraph: React.FC = () => {
  const { towerData, cameraMode } = useMuseumStore();

  const nodeMap = useMemo(() => {
    if (!towerData) return new Map<string, ConceptNode>();
    const map = new Map<string, ConceptNode>();
    towerData.nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [towerData]);

  const spineGeo = useMemo(
    () => (towerData ? buildLineGeometry(towerData.edges, nodeMap, (e) => e.type === 'structural', false) : null),
    [towerData, nodeMap],
  );

  const dependencyGeo = useMemo(
    () => (towerData ? buildLineGeometry(towerData.edges, nodeMap, (e) => e.type === 'dependency', true) : null),
    [towerData, nodeMap],
  );

  const dependencyEdges = useMemo(
    () => towerData?.edges.filter((e) => e.type === 'dependency') ?? [],
    [towerData],
  );

  useEffect(
    () => () => {
      spineGeo?.dispose();
      dependencyGeo?.dispose();
    },
    [spineGeo, dependencyGeo],
  );

  if (!towerData) return null;

  return (
    <>
      {cameraMode === 'scroll' ? (
        <CameraController />
      ) : (
        <OrbitControls makeDefault enableDamping dampingFactor={0.05} target={[0, 40, 0]} />
      )}

      {cameraMode === 'orbit' && <pointLight position={[0, 150, 50]} intensity={2} color="#ffffff" distance={200} />}

      <ambientLight intensity={1.5} />
      <pointLight position={[0, 150, 0]} intensity={4} color="#ffffff" />
      <pointLight position={[0, -100, 0]} intensity={4} color="#ffffff" />
      <hemisphereLight groundColor="#0f172a" color="#ffffff" intensity={1.5} />

      <group>
        {spineGeo && (
          <lineSegments geometry={spineGeo}>
            <lineBasicNodeMaterial color={0x94a3b8} transparent opacity={0.1} />
          </lineSegments>
        )}

        {dependencyGeo && (
          <lineSegments geometry={dependencyGeo}>
            <lineBasicNodeMaterial vertexColors transparent opacity={0.3} />
          </lineSegments>
        )}

        {dependencyEdges.map((edge) => {
          const source = nodeMap.get(edge.source);
          const target = nodeMap.get(edge.target);
          if (!source || !target) return null;
          return <EdgeHitbox key={edge.id} edge={edge} sourcePos={source.position} targetPos={target.position} />;
        })}

        <ShapesInstancedGroup nodes={towerData.nodes} />
        <MacroLayers nodes={towerData.nodes} />
      </group>
    </>
  );
};
