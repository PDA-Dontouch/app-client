import tw, { styled } from 'twin.macro';
import { EmblaOptionsType } from 'embla-carousel';
// import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import useEmblaCarousel from 'embla-carousel-react';

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

const Container = styled.div`
  ${tw`w-[100%] h-[200px]`}
`;

const View = styled.div`
  overflow: hidden;
`;

const Wrapper = styled.div<{ length: number }>`
  backface-visibility: hidden;
  display: flex;
  ${({ length }) => (length === 1 ? '' : 'margin-left: calc(1rem * -1)')}
`;

const Slide = styled.div<{ length: number }>`
  ${({ length }) =>
    length === 1 ? 'flex: 0 0 100%' : 'ps-[1rem] flex: 0 0 80%'}
`;

const SlideItem = styled.img`
  ${tw`shadow-[2px_2px_4px_0_rgba(0, 0, 0, 0.1)]`}
  border-radius: 8px;
  height: 200px;
  width: 100%;
`;

const Carousel = ({ slides, options }: PropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  return (
    <Container>
      <View ref={emblaRef}>
        <Wrapper length={slides.length}>
          {slides.map((item, index) => (
            <Slide key={index} length={slides.length}>
              <SlideItem src={item} />
            </Slide>
          ))}
        </Wrapper>
      </View>
    </Container>
  );
};

export default Carousel;
