import { Cpu, Layers, Terminal as TerminalIcon, Zap, Search, Check, Box } from 'lucide-react';
import { FeatureCard, SectionTitle } from '../components/Common';

export const Features = () => {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Core Capabilities" subtitle="System Features" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            index={0}
            icon={Cpu} 
            title="Unified Engines" 
            description="A single interface to prepare and orchestrate JS logic, HTML structures, and CSS stylesheets."
          />
          <FeatureCard 
            index={1}
            icon={Layers} 
            title="Deep Interpolation" 
            description="Native serialization of functions and objects directly into your sources via the $$key syntax."
          />
          <FeatureCard 
            index={2}
            icon={TerminalIcon} 
            title="Lifecycle Tracking" 
            description="Every injection is stamped with a unique xeval key, allowing for surgical cleanup or reference retrieval."
          />
          <FeatureCard 
            index={3}
            icon={Zap} 
            title="Stateful Updates" 
            description="Modify the content of injected HTML or CSS containers dynamically using the .update() method."
          />
          <FeatureCard 
            index={4}
            icon={Search} 
            title="Smart Caching" 
            description="loadFrom automatically identifies extensions and features built-in caching with TTL and stale fallbacks."
          />
          <FeatureCard 
            index={5}
            icon={Box} 
            title="Auto-Unwrap HTML" 
            description="Since v5.3.0, single root elements are injected natively without wrapping divs, keeping your DOM immaculate."
          />
          <FeatureCard 
            index={6}
            icon={Check} 
            title="Dual Callbacks" 
            description="Register fine-grained onInject hooks at both the engine level and the individual run level."
          />
        </div>
      </div>
    </div>
  );
};
