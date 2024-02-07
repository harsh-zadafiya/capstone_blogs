import React from 'react';
import { Navigation } from './Navigation';
import { VideoFrame } from '../../components';
import { ContentWrapper, PageWrapper, SectionWrapper} from '../../style/Wrapper';

const HomePage = () => {
  return (
    <PageWrapper>
        <Navigation />
          <SectionWrapper>
            <ContentWrapper>
              <div className="intro">
                <h1>Welcome to Our Blog</h1>
                <p>Welcome to our blog, your one-stop destination for a diverse range of content covering various topics such as food, travel, colleges, immigration, pubs, and much more. Our blog aims to provide you with insightful and engaging articles that cater to different interests and passions. Whether you're a food enthusiast looking for new recipes to try, a travel junkie seeking adventure inspiration, a student navigating the college experience, an immigrant exploring new opportunities, or someone who enjoys a vibrant nightlife scene, our blog has something for everyone.Through a blend of informative guides, personal experiences, reviews, and expert insights, we strive to offer valuable content that entertains, educates, and inspires our readers. Join us on a journey of discovery as we explore diverse cultures, uncover hidden gems, share practical tips, and celebrate the richness of life's experiences. Stay tuned for captivating stories, practical advice, and a wealth of knowledge that will enrich your journey through life's many adventures. Welcome aboard, and happy reading!</p>
              </div>
            </ContentWrapper>
            <VideoFrame
              title="Under Maintenance"
              src=""
              id=""
              alt=""
              required
            />
          </SectionWrapper>
    </PageWrapper>
  );
};

export default HomePage;
