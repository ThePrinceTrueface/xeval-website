import { Terminal, Cpu, Layers, Zap, Box, Shield, Search, RefreshCw, Trash2, Download, Palette } from 'lucide-react';

export const DOC_STRUCTURE = [
  {
    category: "Fundamentals",
    items: [
      { id: "intro", name: "Introduction", icon: Terminal, path: "/docs/intro" },
      { id: "install", name: "Installation", icon: Download, path: "/docs/install" },
      { id: "basic", name: "Basic Usage", icon: Cpu, path: "/docs/basic" }
    ]
  },
  {
    category: "The Engines",
    items: [
      { id: "script", name: "Script Engine", icon: Terminal, path: "/docs/script" },
      { id: "html", name: "HTML Engine", icon: Box, path: "/docs/html" },
      { id: "css", name: "CSS Engine", icon: Palette, path: "/docs/css" }
    ]
  },
  {
    category: "Advanced Logic",
    items: [
      { id: "templates", name: "Template Syntax", icon: Layers, path: "/docs/templates" },
      { id: "lifecycle", name: "Lifecycle & Cleanup", icon: Trash2, path: "/docs/lifecycle" },
      { id: "updates", name: "Stateful Updates", icon: RefreshCw, path: "/docs/updates" },
      { id: "remote", name: "Remote & Cache", icon: Search, path: "/docs/remote" },
      { id: "callbacks", name: "Dual Callbacks", icon: Zap, path: "/docs/callbacks" }
    ]
  },
  {
    category: "Reference",
    items: [
      { id: "api", name: "API Reference", icon: Shield, path: "/docs/api" }
    ]
  }
];
