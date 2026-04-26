import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Send } from 'lucide-react';
import { User } from 'firebase/auth';
import { auth, db, googleProvider, signInWithPopup, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, handleFirestoreError, OperationType } from '../lib/firebase';
import { SectionTitle } from './Common';

export const FeedbackSection = ({ user }: { user: User | null }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(docs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "comments");
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "comments"), {
        text: newComment.trim(),
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        userPhoto: user.photoURL || "",
        createdAt: serverTimestamp()
      });
      setNewComment("");
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "comments");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <section id="feedback" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
      <SectionTitle title="Community Logs" subtitle="Feedback Layer" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 border border-border-dark bg-[#0e0e10] rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <MessageSquare size={120} />
            </div>
            
            <h3 className="text-2xl font-bold italic uppercase mb-6 flex items-center gap-3">
              <MessageSquare className="text-accent-green" size={24} />
              Transmit Data
            </h3>
            
            {user ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full border border-accent-green/30" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase">{user.displayName}</span>
                    <span className="text-[9px] text-white/30 font-mono tracking-widest leading-none">AUTH_VERIFIED</span>
                  </div>
                </div>
                
                <textarea 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Enter your system feedback..."
                  className="w-full h-32 bg-black/40 border border-white/10 rounded-sm p-4 text-sm font-mono focus:outline-none focus:border-accent-green transition-all resize-none placeholder:text-white/10"
                  maxLength={500}
                />
                
                <button 
                  disabled={isSubmitting || !newComment.trim()}
                  className="w-full py-4 bg-accent-green text-black font-bold uppercase tracking-widest text-[10px] rounded-sm hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  <Send size={14} /> {isSubmitting ? 'Transmitting...' : 'Send Feedback'}
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-6">
                <p className="text-white/40 text-xs font-mono uppercase tracking-widest leading-relaxed">
                  Authentication required to access the transmission layer and interact with the collective.
                </p>
                <button 
                  onClick={handleLogin}
                  className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] rounded-sm hover:bg-accent-green hover:text-black hover:border-accent-green transition-all duration-300"
                >
                  Auth with Google
                </button>
              </div>
            )}
          </div>
          
          <div className="p-6 border border-border-dark bg-[#0e0e10]/50 rounded-sm text-[10px] font-mono text-white/30 space-y-2 uppercase">
            <p>• Data is globally synchronized.</p>
            <p>• Strict character limit: 500 characters.</p>
            <p>• Immutable record strategy applied.</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            {comments.length > 0 ? (
              comments.map((comment, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  key={comment.id} 
                  className="p-6 border-l-2 border-accent-green/20 bg-white/5 relative group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img src={comment.userPhoto || ''} alt="" className="w-6 h-6 rounded-full grayscale group-hover:grayscale-0 transition-all" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-accent-green">{comment.userName}</span>
                    <span className="text-[9px] text-white/20 font-mono ml-auto">
                      {comment.createdAt?.toDate ? comment.createdAt.toDate().toLocaleString() : 'Just now'}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm italic font-light leading-relaxed">
                    "{comment.text}"
                  </p>
                </motion.div>
              ))
            ) : (
              <div className="h-64 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-sm text-white/20 font-mono italic">
                <p>No transmissions found in history.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
