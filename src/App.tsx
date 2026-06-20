import { useCallback, useEffect, useState } from 'react';
import type { Persona } from './content/types';
import { PersonaSelector } from './components/PersonaSelector';
import { RecruiterView } from './components/RecruiterView';
import { FounderView } from './components/FounderView';
import { StalkerView } from './components/StalkerView';

function getPersonaFromURL(): Persona | null {
  const params = new URLSearchParams(window.location.search);
  const p = params.get('persona');
  if (p === 'recruiter' || p === 'founder' || p === 'stalker') return p;
  return null;
}

function setPersonaInURL(p: Persona | null) {
  const params = new URLSearchParams(window.location.search);
  if (p) {
    params.set('persona', p);
  } else {
    params.delete('persona');
    params.delete('lens');
  }
  const next = params.toString() ? `?${params.toString()}` : window.location.pathname;
  window.history.pushState({}, '', next);
}

export default function App() {
  const [persona, setPersona] = useState<Persona | null>(getPersonaFromURL);

  useEffect(() => {
    const onPop = () => setPersona(getPersonaFromURL());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const select = useCallback((p: Persona) => {
    setPersonaInURL(p);
    setPersona(p);
  }, []);

  const back = useCallback(() => {
    setPersonaInURL(null);
    setPersona(null);
  }, []);

  if (!persona) return <PersonaSelector onSelect={select} />;
  if (persona === 'recruiter') return <RecruiterView onBack={back} />;
  if (persona === 'founder') return <FounderView onBack={back} />;
  return <StalkerView onBack={back} />;
}
