import type {ReactNode} from 'react';
import ResourceDetailPage from '@site/src/components/Resources/ResourceDetailPage';
import {getResource} from '@site/src/data/resources';
import PythonIntroduction from '@site/src/content/resources/python-introduction.mdx';

export default function PythonResourcePage(): ReactNode {
  return <ResourceDetailPage resource={getResource('lam-quen-voi-python')}><PythonIntroduction /></ResourceDetailPage>;
}
