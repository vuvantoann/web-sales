import { Drawer } from "antd";

function DrawerComponent ({ title = 'Drawer', placement = 'right', isOpen = false, children, ...rests }) {
    return (
        <>
        <Drawer title={title} placemen={placement} open={isOpen} {...rests}>
            {children}
        </Drawer>
    </>
    )
}

export default DrawerComponent;