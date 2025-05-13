import { Inbox } from '@novu/nextjs';

function Novu() {
  return (
    <Inbox
      applicationIdentifier="zG4_SFdrhS2u"
      subscriberId="67e3ff6d463586a7aecc55df"
      appearance={{
        variables: {
          colorPrimary: "#7D52F4",
          colorForeground: "#0E121B"
        }
      }}
    />
  );
}
export default Novu;