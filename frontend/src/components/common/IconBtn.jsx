export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
    component,
    ...props
}) {
    const Component = component || "button";

    return (
        <Component
            disabled={disabled}
            onClick={onclick}
            className={`flex items-center justify-center outline-none ${
                outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
            } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 hover:bg-black hover:text-yellow-50 duration-300 ${customClasses}`}
            type={type}
            {...props}
        >
            {children ? (
                <>
                    <span className={`${outline && "text-yellow-50"}`}>{text}</span>
                    {children}
                </>
            ) : (
                text
            )}
        </Component>
    );
}
