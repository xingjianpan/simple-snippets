import React from 'react';
import SnippetList from '../SnippetListContainer';
import { PUBLIC_SNIPPETS_URL } from '../../services/api';

const PublicSnippets = () => <SnippetList targetUrl={`${PUBLIC_SNIPPETS_URL}/`} />;
export default PublicSnippets;
