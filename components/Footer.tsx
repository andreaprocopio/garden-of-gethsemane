import { TypographyMuted } from "./TypographyMuted";

const Footer = () => {
  const text = `© ${new Date().getFullYear()} Andrea Procopio. All rights reserved.`;
  return (
    <footer className="w-full border-t border-border py-6">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-1">
        <p className="text-sm font-medium text-foreground">
          Garden of Gethsemane
        </p>
        <TypographyMuted text={text} />
      </div>
    </footer>
  );
};

export default Footer;
