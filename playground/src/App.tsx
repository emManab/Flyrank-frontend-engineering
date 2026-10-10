import { useCallback, useState } from "react";
import { Disclosure } from "./components/Disclosure";
import { ModalDialog } from "./components/ModalDialog";
import { Tabs, type TabItem } from "./components/Tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger,
} from "./components/ui/dialog";
import { Tabs as UITabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

const tabItems: TabItem[] = [
  { id: "overview", label: "Overview", content: <div><h3>Small interactions, big impact.</h3><p>Tabs let people move between related panels without losing their place. Use the arrow keys to switch panels.</p></div> },
  { id: "keyboard", label: "Keyboard", content: <div><h3>Keyboard is a first-class input.</h3><p>Left and Right Arrow move between tabs. Home and End jump to the first and last tab. Tab moves focus into the active panel.</p></div> },
  { id: "details", label: "Details", content: <div><h3>State is communicated.</h3><p>Each tab exposes its selected state and identifies the panel it controls using ARIA relationships.</p></div> },
];

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <main className="page">
      <header className="hero">
        <div className="eyebrow"><span className="eyebrow-dot" /> FRONTEND FOUNDATIONS / 01</div>
        <h1>Accessible by <em>design.</em></h1>
        <p className="hero-copy">Three interaction patterns, built by hand. Then a look under the hood at shadcn/ui.</p>
        <div className="hero-meta"><span><b>03</b> custom components</span><span><b>02</b> shadcn primitives</span><span><b>0</b> component libraries in custom versions</span></div>
      </header>

      <section className="component-section" aria-labelledby="dialog-heading">
        <div className="section-top"><div><span className="section-number">01 / DIALOG</span><h2 id="dialog-heading">Modal dialog</h2><p>Focus moves inside, stays inside, and returns to the trigger.</p></div><span className="tag">Hand-built</span></div>
        <div className="demo-card dialog-demo">
          <div className="demo-copy"><span className="micro-label">TRY IT</span><h3>Open the dialog</h3><p>Use Tab and Shift+Tab to cycle through the controls. Press Escape to close it.</p><button className="primary-button" onClick={() => setModalOpen(true)}>Open custom dialog <span aria-hidden="true">↗</span></button></div>
          <div className="interaction-hint"><span className="keycap">TAB</span><span className="keycap">⇧ TAB</span><span className="keycap">ESC</span><small>Keyboard tested by design</small></div>
        </div>
      </section>

      <section className="component-section" aria-labelledby="tabs-heading">
        <div className="section-top"><div><span className="section-number">02 / TABS</span><h2 id="tabs-heading">Tabbed content</h2><p>Roving focus with arrow-key, Home, and End navigation.</p></div><span className="tag">Hand-built</span></div>
        <div className="demo-card"><Tabs items={tabItems} label="Custom component details" /></div>
      </section>

      <section className="component-section" aria-labelledby="disclosure-heading">
        <div className="section-top"><div><span className="section-number">03 / DISCLOSURE</span><h2 id="disclosure-heading">Progressive disclosure</h2><p>Reveal details on demand while exposing the expanded state.</p></div><span className="tag">Hand-built</span></div>
        <div className="demo-card disclosure-demo">
          <Disclosure title="What makes a disclosure accessible?" defaultOpen>
            <p>The trigger is a real button, so Enter and Space work without custom key handlers. Its <code>aria-expanded</code> value reflects the current state, and <code>aria-controls</code> points to the panel.</p>
          </Disclosure>
          <Disclosure title="What should I test with only a keyboard?">
            <p>Tab to the trigger, press Enter or Space to toggle it, then verify the panel appears and disappears. The trigger should remain in the normal focus order.</p>
          </Disclosure>
          <Disclosure title="Why not use a clickable div?">
            <p>A generic element does not provide button semantics, keyboard activation, or a reliable accessible name by default.</p>
          </Disclosure>
        </div>
      </section>

      <section className="component-section shadcn-section" aria-labelledby="shadcn-heading">
        <div className="section-top"><div><span className="section-number">04 / SOURCE REVIEW</span><h2 id="shadcn-heading">Same patterns, shadcn-style primitives</h2><p>These components use Radix primitives behind readable local wrappers.</p></div><span className="tag tag-dark">Source included</span></div>
        <div className="comparison-grid">
          <div className="demo-card">
            <span className="micro-label">DIALOG</span><h3>Primitive-managed focus</h3><p>Compare focus handling and dismissal behavior with the custom version above.</p>
            <Dialog>
              <DialogTrigger asChild><button className="secondary-button">Open shadcn dialog <span aria-hidden="true">↗</span></button></DialogTrigger>
              <DialogContent>
                <DialogTitle>Dialog from local UI source</DialogTitle>
                <DialogDescription>Radix manages focus trapping, focus restoration, Escape handling, and outside interaction behavior.</DialogDescription>
                <div className="modal-content">
                  <label className="field-label" htmlFor="display-name">Display name</label>
                  <input id="display-name" className="text-field" placeholder="Ada Lovelace" />
                  <button className="primary-button" onClick={() => setSaved(true)}>{saved ? "Saved locally ✓" : "Save preference"}</button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="demo-card">
            <span className="micro-label">TABS</span><h3>More built-in options</h3><p>Try arrow keys. Radix handles the tab pattern through the local shadcn-style wrappers.</p>
            <UITabs defaultValue="a" className="tabs-root">
              <TabsList aria-label="Primitive tabs">
                <TabsTrigger value="a">Focus</TabsTrigger>
                <TabsTrigger value="b">State</TabsTrigger>
                <TabsTrigger value="c">Composition</TabsTrigger>
              </TabsList>
              <TabsContent value="a" className="tab-panel"><h3>Focus management</h3><p>The primitive manages roving focus and keyboard navigation.</p></TabsContent>
              <TabsContent value="b" className="tab-panel"><h3>Selection state</h3><p>Selected and controlled panel semantics are generated consistently.</p></TabsContent>
              <TabsContent value="c" className="tab-panel"><h3>Composable API</h3><p>Small building blocks can be composed while preserving the primitive behavior.</p></TabsContent>
            </UITabs>
          </div>
        </div>
      </section>

      <footer className="page-footer"><span className="footer-mark">a11y / lab</span><span>Built with React + TypeScript. No <code>any</code> props.</span><a href="./NOTES.md">Read NOTES.md ↗</a></footer>

      <ModalDialog open={modalOpen} onClose={closeModal} title="Make it yours" description="This is the hand-built dialog. Test the keyboard interactions before saving.">
        <label className="field-label" htmlFor="custom-name">Your name</label>
        <input id="custom-name" className="text-field" placeholder="Ada Lovelace" />
        <label className="check-row"><input type="checkbox" /> Keep me in the loop</label>
        <div className="modal-actions"><button className="secondary-button" onClick={closeModal}>Cancel</button><button className="primary-button" onClick={() => { setSaved(true); closeModal(); }}>Save preference</button></div>
      </ModalDialog>
    </main>
  );
}
