import { createContext } from "react";

type EmailContextValue = {
  email?: string;
};

const EmailContext = createContext<EmailContextValue>({});

export default EmailContext;
