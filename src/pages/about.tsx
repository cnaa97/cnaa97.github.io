import React from 'react';

import { Content } from '../content/Content';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const About = () => (
  <Main meta={<Meta title="About" description="소개" />}>
    <Content>
      <p>
        핀테크, 이커머스를 거쳐, 현재 모빌리티 영역에서 프론트엔드 개발자로
        일하고 있습니다.
      </p>
    </Content>
  </Main>
);

export default About;
