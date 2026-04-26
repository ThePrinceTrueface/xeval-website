import { Outlet } from 'react-router-dom';
import { DocSidebar } from '../components/DocNavigation';
import { SectionTitle } from '../components/Common';

export const DocumentationLayout = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <SectionTitle title="Documentation" subtitle="System Manual" />
      
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/4">
          <div className="sticky top-32">
            <DocSidebar />
          </div>
        </div>
        
        <div className="lg:w-3/4 max-w-none">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
