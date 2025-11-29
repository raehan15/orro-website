import TestScene from "@/components/canvas/TestScene";
import Navbar from "@/components/dom/Navbar";
import Overlay from "@/components/dom/Overlay";

export default function TestGLBPage() {
  return (
    <main className="relative w-full h-[500vh] bg-neutral-950">
      <Navbar />
      <div className="fixed inset-0 z-0">
        <TestScene />
      </div>
      <Overlay />
    </main>
  );
}
