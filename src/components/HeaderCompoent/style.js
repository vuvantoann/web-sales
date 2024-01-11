import { Col, Row } from "antd";
import styled from "styled-components";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const WrapperHeader = styled(Row)`
  margin-top: 0px;
  padding: 8px 12px 12px;
  background-color: #0f5b99;
  align-items: center;
`;

export const StyledLocationOnIcon = styled(LocationOnIcon)`
  font-size: 32px;
  padding: 6px;
  border: 2px solid white;
  border-radius: 50%;
  color: white;
  position: relative;
  
 
`;

export const WrapperLogoContein = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1; 
  margin-right: 0;
  font-size: 

  
`;

export const WrapperLogoHeader = styled.div`
  background-image: url('/image/logo_header.png');
  background-size: 60%; 
  background-repeat: no-repeat;
  width: 500px; 
  height: 40px; 
  margin-right: 10px;
  background-position: right; 
`;

export const WrapperIconHeader = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  align-items: center;
  padding-right: 8px;
  cursor: pointer;

  svg {
    fill: #fff;
    width: 24px;
    height: 24px;
    
  }
`;

export const WrapperTextHeader = styled.span`
  color: #fff;
  font-size: 12px;
  font-weight: 500;
`;

export const WrapperContentPoup = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(26, 148, 255);
  }
`;