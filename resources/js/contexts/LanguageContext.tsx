import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

type Language = 'fr' | 'en';

interface Translations {
  nav: {
    login: string;
    signup: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  cards: {
    formulas: {
      title: string;
      description: string;
      button: string;
    };
    custom: {
      title: string;
      description: string;
      button: string;
    };
    ownBoat: {
      title: string;
      description: string;
      button: string;
    };
  };
  footer: {
    securePayment: string;
    flexibleCancellation: string;
    customerSupport: string;
  };
  auth: {
    loginTitle: string;
    signupTitle: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    loginButton: string;
    signupButton: string;
    noAccount: string;
    hasAccount: string;
    logout: string;
  };
}

const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      login: 'Connexion à mon compte',
      signup: 'Créer un nouveau compte',
    },
    hero: {
      title: 'SWEN Voile',
      subtitle: 'École de Voile - Réservation en Ligne',
    },
    cards: {
      formulas: {
        title: 'Formules, Cours & Stages',
        description: 'Découvrez nos formules et certifications adaptées à tous les niveaux, du débutant au confirmé.',
        button: 'Réserver',
      },
      custom: {
        title: 'Réservation À la carte',
        description: 'Réservez votre créneau en quelques clics en fonction de votre niveau et gérez vos réservations facilement',
        button: 'Réserver',
      },
      ownBoat: {
        title: 'J\'ai mon bateau',
        description: 'Réservez un cours ou une formule sur votre bateau et montez en compétence',
        button: 'Réserver',
      },
    },
    footer: {
      securePayment: 'Paiement sécurisé',
      flexibleCancellation: 'Annulation flexible',
      customerSupport: 'Support client dédié',
    },
    auth: {
      loginTitle: 'Connexion',
      signupTitle: 'Créer un compte',
      email: 'Email',
      password: 'Mot de passe',
      firstName: 'Prénom',
      lastName: 'Nom',
      loginButton: 'Se connecter',
      signupButton: 'Créer mon compte',
      noAccount: 'Pas encore de compte ?',
      hasAccount: 'Déjà un compte ?',
      logout: 'Déconnexion',
    },
  },
  en: {
    nav: {
      login: 'Login to my account',
      signup: 'Create a new account',
    },
    hero: {
      title: 'SWEN Sailing',
      subtitle: 'Sailing School - Online Booking',
    },
    cards: {
      formulas: {
        title: 'Packages, Courses & Camps',
        description: 'Discover our packages and certifications adapted to all levels, from beginner to advanced.',
        button: 'Book Now',
      },
      custom: {
        title: 'À la carte Booking',
        description: 'Book your time slot in a few clicks based on your level and manage your bookings easily',
        button: 'Book Now',
      },
      ownBoat: {
        title: 'I have my own boat',
        description: 'Book a course or package on your boat and improve your skills',
        button: 'Book Now',
      },
    },
    footer: {
      securePayment: 'Secure Payment',
      flexibleCancellation: 'Flexible Cancellation',
      customerSupport: 'Dedicated Customer Support',
    },
    auth: {
      loginTitle: 'Login',
      signupTitle: 'Create an account',
      email: 'Email',
      password: 'Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      loginButton: 'Sign In',
      signupButton: 'Create my account',
      noAccount: 'No account yet?',
      hasAccount: 'Already have an account?',
      logout: 'Logout',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
