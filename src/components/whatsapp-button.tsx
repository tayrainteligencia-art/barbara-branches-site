import { getWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppButton() {
  const href = getWhatsAppLink();
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/20 transition-transform duration-300 ease-out hover:scale-110 motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-7 w-7 fill-white"
      >
        <path d="M16.004 3C9.377 3 4 8.377 4 15.004c0 2.372.68 4.617 1.965 6.559L4 29l7.627-1.933a11.93 11.93 0 0 0 4.377.827h.004c6.627 0 12.004-5.377 12.004-12.004C28.012 8.377 22.635 3 16.004 3Zm0 21.86h-.003a9.87 9.87 0 0 1-5.03-1.379l-.36-.214-3.75.951 1.003-3.653-.235-.375a9.855 9.855 0 0 1-1.514-5.186c0-5.457 4.44-9.897 9.9-9.897 2.644 0 5.128 1.031 6.996 2.902a9.833 9.833 0 0 1 2.898 6.998c0 5.457-4.44 9.853-9.905 9.853Zm5.427-7.394c-.297-.149-1.758-.867-2.031-.966-.273-.099-.472-.148-.67.15-.198.297-.767.965-.94 1.163-.173.198-.347.223-.644.075-.297-.149-1.253-.462-2.386-1.472-.882-.787-1.478-1.76-1.651-2.057-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.074-.149-.669-1.612-.917-2.208-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.075-.793.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.148.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.412-.074-.124-.272-.198-.57-.347Z" />
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-sm text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Fale conosco no WhatsApp
      </span>
    </a>
  );
}
