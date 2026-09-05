"""Knowledge base dispatcher providing vetted implementations for concepts across languages."""
from knowledge_ad_hoc import AD_HOC_KNOWLEDGE
from knowledge_associated import ASSOCIATED_KNOWLEDGE

CONCEPT_MAPS = {
    'abstraction-over-types.ad': AD_HOC_KNOWLEDGE,
    'abstraction-over-types.associated': ASSOCIATED_KNOWLEDGE
}

def get_vetted_implementation(concept_id: str, language: str) -> dict | None:
    """Returns the vetted implementation details for a concept/language pair, or None."""
    kmap = CONCEPT_MAPS.get(concept_id)
    if kmap and language in kmap:
        return kmap[language]
    return None
