import HeaderComponent from "../HeaderCompoent/HeaderComponent";
function DefaultComponent ({children}) {
    return (
        <div>
            <HeaderComponent />
            {children}
        </div>
    )
}

export default DefaultComponent;