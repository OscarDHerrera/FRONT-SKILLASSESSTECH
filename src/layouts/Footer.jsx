import styled from 'styled-components';


const FooterContainer = styled.div`
  width: 100%;
  min-height: 80px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #083cbc;
  color: #ffffff;
  position: sticky;
  bottom: 0;
  font-family: 'Fira Code';
`;

const FooterWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const FooterLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  font-family: 'Fira Code';
  font-weight: bold;
`;

const FooterBottom = styled.div`
  margin-top: auto;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterRow>
          <FooterColumn>
            <FooterTitle>Enlaces</FooterTitle>
            <FooterLink href="#">Enlace 1</FooterLink>
            <FooterLink href="#">Enlace 2</FooterLink>
            <FooterLink href="#">Enlace 3</FooterLink>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Contacto</FooterTitle>
            <FooterLink href="#">Correo electrónico</FooterLink>
            <FooterLink href="#">Teléfono</FooterLink>
            <FooterLink href="#">Dirección</FooterLink>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Redes Sociales</FooterTitle>
            <FooterLink href="#">Facebook</FooterLink>
            <FooterLink href="#">Twitter</FooterLink>
            <FooterLink href="#">Instagram</FooterLink>
          </FooterColumn>
        </FooterRow>
        <FooterBottom>
          <p>Derechos reservados © 2023</p>
        </FooterBottom>
      </FooterWrapper>
    </FooterContainer>
  );
};