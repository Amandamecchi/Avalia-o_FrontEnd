"use client"
import React from 'react';
import { Button, Flex} from 'antd';
import Link from 'next/link';

const profile = () => (
  <Flex wrap gap="small" className="site-button-ghost-wrapper">
    <Button type="primary" danger ghost>

      <Link href="/animais" prefetch> Ver Animais</Link>
    </Button>
  </Flex>
);
export default profile;