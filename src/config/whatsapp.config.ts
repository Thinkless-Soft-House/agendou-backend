import { WhatsAppProvider } from "@/enums/provider.enum";

export const WHATSAPP_CONFIG = {
    [WhatsAppProvider.WHATSAPP_ATENDE]: {
      endpoint: 'https://api11.whatsatende.com.br/api/messages/send',
      authType: 'Bearer' as const,
      token: process.env.WHATSAPP_ATENDE_TOKEN
    },
    [WhatsAppProvider.BOTFLEX]: {
      endpoint: 'https://rest.botflex.com.br/api/v1/chat/send-message/integration',
      authType: 'x-integration-token' as const,
      token: process.env.BOTFLEX_TOKEN
    }
  };