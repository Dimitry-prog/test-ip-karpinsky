import { Button } from '@/shared/components/ui/button.tsx';

const Header = () => {
  return (
    <header className="grid">
      <Button variant="ghost" className="w-fit justify-self-end">
        User Button
      </Button>
    </header>
  );
};

export default Header;
