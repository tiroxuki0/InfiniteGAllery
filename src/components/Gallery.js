import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ColStyled = styled.div`
  transition: all 0.4s ease;
  position: relative;
`;

const GalleryWrapper = styled.div`
  margin-top: 10px;
`;

function Gallery({ images }) {
  return (
    <GalleryWrapper className="image-grid">
      {images.length === 0
        ? ""
        : images.map((i, index) => {
            let largeWidth = 3;
            let imagesLength = images.length - 10;
            if (index === imagesLength) {
              largeWidth = "image-grid-col-2 image-grid-row-2";
            } else {
              largeWidth = "image-grid-col-1 image-grid-row-1";
            }
            return (
              <ColStyled key={index} className={largeWidth}>
                <a
                  href={i.urls.regular}
                  data-fancybox="gallery"
                  data-caption={i.description}
                >
                  <LazyLoadImage
                    src={i.urls.regular}
                    data-download={i.links.download}
                    alt={i.urls.regular}
                    effect="blur"
                  />
                </a>
              </ColStyled>
            );
          })}
    </GalleryWrapper>
  );
}

export default Gallery;
