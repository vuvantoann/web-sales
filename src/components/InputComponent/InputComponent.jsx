import { Input } from "antd";

function InputComponent ({size, placeholder, bordered, style, ...rests}) {
    return (
        <div>
            <Input 
                size ={size}
                placeholder={placeholder}
                bordered={bordered}
                style={style}
                {...rests}
            />
        </div>
    )
}

export default InputComponent;