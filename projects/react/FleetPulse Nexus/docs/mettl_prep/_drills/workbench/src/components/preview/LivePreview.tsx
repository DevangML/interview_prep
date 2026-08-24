import SandboxFrame from './SandboxFrame';

interface Props {
  baseCSS: string;
  userCSS: string;
  jsCode: string;
}

export default function LivePreview({ baseCSS, userCSS, jsCode }: Props) {
  return (
    <div className="flex flex-col flex-1 min-h-0 h-full border border-gray-200 rounded-lg overflow-hidden">
      <SandboxFrame baseCSS={baseCSS} userCSS={userCSS} jsCode={jsCode} />
    </div>
  );
}
