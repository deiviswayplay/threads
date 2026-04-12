"use client";

import { useState } from 'react';
import SideNav from '../componentes/SideNav';
import FeedHeader from '../componentes/FeedHeader';
import PostFeed from '../componentes/PostFeed';
import CreatePostModal from '../componentes/CreatePostModal';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostCreated = () => {
    setIsModalOpen(false);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.navegacion}>
        <SideNav />
      </div>
      <main className={styles.contenidoPrincipal}>
        <FeedHeader onCreateClick={() => setIsModalOpen(true)} />
        <PostFeed refreshTrigger={refreshKey} />
        <CreatePostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onPostCreated={handlePostCreated}
        />
      </main>
    </div>
  );
}