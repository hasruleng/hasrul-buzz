import { useCallback, useEffect, useState } from 'react';
import type { Persona, RoleLens } from './content/types';
import { getLens } from './content/lenses';
import { PersonaSelector } from './components/PersonaSelector';
import { LensSelector } from './components/LensSelector';
import { RecruiterView } from './components/RecruiterView';
import { FounderView } from './components/FounderView';
import { StalkerView } from './components/StalkerView';

type RouteState = { persona: Persona | null; lens: RoleLens | null };

function readRoute(): RouteState {
  const params = new URLSearchParams(window.location.search);
  const p = params.get('persona');
  const persona: Persona | null =
    p === 'recruiter' || p === 'founder' || p === 'stalker' ? p : null;
  const lens = getLens(params.get('lens'));
  return { persona, lens: lens ? lens.id : null };
}

function writeRoute({ persona, lens }: RouteState) {
  const params = new URLSearchParams();
  if (persona) params.set('persona', persona);
  if (persona === 'recruiter' && lens) params.set('lens', lens);
  const qs = params.toString();
  window.history.pushState({}, '', qs ? `?${qs}` : window.location.pathname);
}

export default function App() {
  const [route, setRoute] = useState<RouteState>(readRoute);

  useEffect(() => {
    const onPop = () => setRoute(readRoute());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((next: RouteState) => {
    writeRoute(next);
    setRoute(next);
  }, []);

  const { persona, lens } = route;

  if (!persona) {
    return <PersonaSelector onSelect={(p) => navigate({ persona: p, lens: null })} />;
  }

  if (persona === 'recruiter') {
    const lensDef = getLens(lens);
    if (!lensDef) {
      return (
        <LensSelector
          onSelect={(l) => navigate({ persona: 'recruiter', lens: l })}
          onBack={() => navigate({ persona: null, lens: null })}
        />
      );
    }
    return (
      <RecruiterView
        lens={lensDef}
        onChangeLens={() => navigate({ persona: 'recruiter', lens: null })}
        onBack={() => navigate({ persona: null, lens: null })}
      />
    );
  }

  if (persona === 'founder') {
    return <FounderView onBack={() => navigate({ persona: null, lens: null })} />;
  }

  return <StalkerView onBack={() => navigate({ persona: null, lens: null })} />;
}
