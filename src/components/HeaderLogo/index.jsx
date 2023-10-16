import { TitleText, SubTitleText, Logo, Container } from './styles';

import Rectangle from '../../../assets/rectangle.png';

export const CustomHeader = ({ title, subtitle }) => {
    return (
        <Container>
            <Logo
                source={Rectangle}
            />

            <TitleText>
                {title}
            </TitleText>

            <SubTitleText>{subtitle}</SubTitleText>
        </Container>
    );
};
