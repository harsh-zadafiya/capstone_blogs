import styled from "styled-components";

export const PageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
`;

export const SectionWrapper = styled.section`
    background-color: ${(props) => props.backgroundColor || '#ffffff'};
    height: ${(props) => props.height || 'auto'};
    width: ${(props) => props.width || '100%'};
    padding: ${(props) => props.padding || '20px'};
    margin: ${(props) => props.margin || '0'};
    position: ${(props) => props.position || 'static'};
    /* Add any other styles as needed */
`;

export const ContentWrapper = styled.div`
    background-color: ${(props) => props.backgroundColor || 'transparent'};
    height: ${(props) => props.height || 'auto'};
    width: ${(props) => props.width || '100%'};
    padding: ${(props) => props.padding || '20px'};
    margin: ${(props) => props.margin || '0'};
    position: ${(props) => props.position || 'static'};
    /* Add any other styles as needed */
`;
