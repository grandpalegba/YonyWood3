import React, { useState, useEffect } from 'react';
import { ViewScreen } from './types';
import { DOCUMENTARIES } from './data/mockData';
import { HomeScreen } from './components/HomeScreen';
import { MatrixExplorer } from './components/MatrixExplorer';
import { DocumentariesListScreen } from './components/DocumentariesListScreen';
import { DocumentaryDetailScreen } from './components/DocumentaryDetailScreen';
import { DuoFeedScreen } from './components/DuoFeedScreen';
import { DuoScreen } from './components/DuoScreen';
import { VideoPlayerScreen } from './components/VideoPlayerScreen';
import { ProtagonistProfileScreen } from './components/ProtagonistProfileScreen';
import { TransmissionScreen } from './components/TransmissionScreen';
import { MyForestScreen } from './components/MyForestScreen';
import { ProfileSettingsScreen } from './components/ProfileSettingsScreen';
import { MessagingScreen } from './components/MessagingScreen';
import { MarketplaceScreen } from './components/MarketplaceScreen';
import { SubmitStoryScreen } from './components/SubmitStoryScreen';
import { RequestVideographerScreen } from './components/RequestVideographerScreen';
import { ReviewSystemScreen } from './components/ReviewSystemScreen';
import { EditorialBackOfficeScreen } from './components/EditorialBackOfficeScreen';
import { NavigationScreen } from './components/NavigationScreen';
import { BottomMenu } from './components/BottomMenu';

export default function App() {
  // Arrive directly on the DUOS feed (no bulky header)
  const [currentScreen, setCurrentScreen] = useState<ViewScreen>({ type: 'duo_feed' });

  // User preferences & series filter state
  const [selectedSeriesFilter, setSelectedSeriesFilter] = useState<string[]>(
    DOCUMENTARIES.map(d => d.id)
  );
  const [language, setLanguage] = useState<string>('fr');
  const [hideQuestionByDefault, setHideQuestionByDefault] = useState<boolean>(true);

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const isVideoPlayer = currentScreen.type === 'video_player';

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8] text-[#20201D] font-sans antialiased selection:bg-[#C89B3C]/30 selection:text-[#20201D] relative">
      
      {/* Main Content Area - Direct immersion */}
      <main className="flex-1">
        {currentScreen.type === 'home' && (
          <MatrixExplorer onNavigate={setCurrentScreen} />
        )}

        {currentScreen.type === 'duo_feed' && (
          <DuoFeedScreen 
            onNavigate={setCurrentScreen} 
            initialDocId={currentScreen.selectedDocId} 
            allowedSeriesIds={selectedSeriesFilter}
          />
        )}

        {currentScreen.type === 'marketplace' && (
          <MarketplaceScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen.type === 'profile' && (
          <ProfileSettingsScreen 
            onNavigate={setCurrentScreen}
            selectedDocFilter={selectedSeriesFilter}
            onUpdateDocFilter={setSelectedSeriesFilter}
            language={language}
            onUpdateLanguage={setLanguage}
            hideQuestionByDefault={hideQuestionByDefault}
            onToggleHideQuestion={setHideQuestionByDefault}
          />
        )}

        {currentScreen.type === 'messaging' && (
          <MessagingScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen.type === 'documentaries' && (
          <DocumentariesListScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen.type === 'documentary_detail' && (
          <DocumentaryDetailScreen 
            documentaryId={currentScreen.documentaryId} 
            onNavigate={setCurrentScreen} 
          />
        )}

        {currentScreen.type === 'duo_detail' && (
          <DuoFeedScreen 
            initialDuoId={currentScreen.duoId} 
            allowedSeriesIds={selectedSeriesFilter}
            onNavigate={setCurrentScreen} 
          />
        )}

        {currentScreen.type === 'video_player' && (
          <VideoPlayerScreen
            story={currentScreen.story}
            protagonist={currentScreen.protagonist}
            duoId={currentScreen.duoId}
            documentaryTitle={currentScreen.documentaryTitle}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen.type === 'protagonist_profile' && (
          <ProtagonistProfileScreen 
            protagonistId={currentScreen.protagonistId} 
            onNavigate={setCurrentScreen} 
          />
        )}

        {currentScreen.type === 'transmission_detail' && (
          <TransmissionScreen 
            protagonistId={currentScreen.protagonistId} 
            transmissionId={currentScreen.transmissionId} 
            onNavigate={setCurrentScreen} 
          />
        )}

        {currentScreen.type === 'my_forest' && (
          <MyForestScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen.type === 'submit_story' && (
          <SubmitStoryScreen 
            preselectedDocumentaryId={currentScreen.preselectedDocumentaryId} 
            onNavigate={setCurrentScreen} 
          />
        )}

        {currentScreen.type === 'request_videographer' && (
          <RequestVideographerScreen onNavigate={setCurrentScreen} />
        )}

        {(currentScreen.type === 'review_system' || currentScreen.type === 'forest_reviews') && (
          <ReviewSystemScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen.type === 'editorial_backoffice' && (
          <EditorialBackOfficeScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen.type === 'site_map' && (
          <NavigationScreen onNavigate={setCurrentScreen} />
        )}
      </main>

      {/* Modern 5-Item Navigation Menu */}
      {!isVideoPlayer && (
        <BottomMenu 
          currentScreen={currentScreen} 
          onNavigate={setCurrentScreen} 
        />
      )}

    </div>
  );
}
