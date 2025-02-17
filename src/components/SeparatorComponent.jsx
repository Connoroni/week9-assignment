import * as Separator from "@radix-ui/react-separator";

export default function SeparatorComponent(props) {
  return (
    <Separator.Root
      className="mx-[15px] bg-white data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px
      "
      decorative
      orientation={props.orientation}
    />
  );
}
