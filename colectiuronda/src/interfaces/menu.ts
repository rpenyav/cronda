export interface MenuItem {
  icon: string;
  text: string;
  url?: string;
  children?: MenuItem[];
  isOpen?: boolean;
}
