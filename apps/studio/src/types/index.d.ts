type DefaultModal = {
  extras: any;
  isOpen: boolean;
  onOpen: (extras?: any) => void;
  onClose: () => void;
};

type SideBarMenuList = {
  [key: string]: {
    name: string;
    icon: React.ReactNode;
    onClick: () => void;
  }[];
};
