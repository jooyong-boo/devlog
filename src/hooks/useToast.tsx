import { toast } from 'react-hot-toast';
import Toast from '@/components/Toast';

const useToast = () => {
  const enqueueDefaultBar = (message: string, id: string) => {
    toast((t) => <Toast status="Default" message={message} id={t.id} />, {
      id,
      duration: 3000,
    });
  };

  const enqueueSuccessBar = (message: string, id: string) => {
    toast((t) => <Toast status="Success" message={message} id={t.id} />, {
      id,
      duration: 3000,
    });
  };

  const enqueueErrorBar = (message: string, id: string) => {
    toast((t) => <Toast status="Error" message={message} id={t.id} />, {
      id,
      duration: 3000,
    });
  };

  const enqueueWarningBar = (message: string, id: string) => {
    toast((t) => <Toast status="Warning" message={message} id={t.id} />, {
      id,
      duration: 3000,
    });
  };

  const enqueueInfoBar = (message: string, id: string) => {
    toast((t) => <Toast status="Info" message={message} id={t.id} />, {
      id,
      duration: 3000,
    });
  };

  const enqueueBarWithType = (
    message: string,
    id: string,
    type: 'default' | 'success' | 'error' | 'warning' | 'info',
  ) => {
    switch (type) {
      case 'default': {
        enqueueDefaultBar(message, id);
        return;
      }
      case 'success': {
        enqueueSuccessBar(message, id);
        return;
      }
      case 'error': {
        enqueueErrorBar(message, id);
        return;
      }
      case 'warning': {
        enqueueWarningBar(message, id);
        return;
      }
      case 'info': {
        enqueueInfoBar(message, id);
        return;
      }
      default: {
        enqueueDefaultBar(message, id);
      }
    }
  };

  return {
    enqueueDefaultBar,
    enqueueSuccessBar,
    enqueueErrorBar,
    enqueueWarningBar,
    enqueueInfoBar,
    enqueueBarWithType,
  };
};

export default useToast;
