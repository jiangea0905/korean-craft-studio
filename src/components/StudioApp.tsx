"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ClassShowcase } from "@/components/classes/ClassShowcase";
import { CraftShowcase } from "@/components/crafts/CraftShowcase";
import { ClassApplicationForm } from "@/components/forms/ClassApplicationForm";
import { OrderInquiryForm } from "@/components/forms/OrderInquiryForm";
import { Modal } from "@/components/ui/Modal";
import { TabPanel, Tabs } from "@/components/ui/Tabs";
import type { Craft, CraftClass } from "@/types";

const TABS = [
  { id: "crafts", label: "공예품 전시·주문" },
  { id: "classes", label: "공방 클래스" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type ModalState =
  | { kind: "order"; craftId: string }
  | { kind: "class"; classId: string }
  | null;

interface StudioAppProps {
  crafts: readonly Craft[];
  classes: readonly CraftClass[];
}

function isTabId(id: string): id is TabId {
  return TABS.some((tab) => tab.id === id);
}

export function StudioApp({ crafts, classes }: StudioAppProps) {
  const [activeTab, setActiveTab] = useState<TabId>("crafts");
  const [modal, setModal] = useState<ModalState>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openOrder = useCallback((craft: Craft, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setModal({ kind: "order", craftId: craft.id });
  }, []);

  const openClass = useCallback((cls: CraftClass, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setModal({ kind: "class", classId: cls.id });
  }, []);

  const closeModal = useCallback(() => setModal(null), []);

  // Return focus to the button that opened the modal once it has closed.
  useEffect(() => {
    if (modal === null && triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [modal]);

  const title =
    modal?.kind === "order"
      ? "주문 문의"
      : modal?.kind === "class"
        ? "클래스 신청"
        : "";

  return (
    <>
      <Tabs
        tabs={TABS}
        activeId={activeTab}
        onChange={(id) => {
          if (isTabId(id)) setActiveTab(id);
        }}
        ariaLabel="온결 공방 메뉴"
      />

      <TabPanel id="crafts" activeId={activeTab}>
        <CraftShowcase crafts={crafts} onInquire={openOrder} />
      </TabPanel>
      <TabPanel id="classes" activeId={activeTab}>
        <ClassShowcase classes={classes} onApply={openClass} />
      </TabPanel>

      <Modal open={modal !== null} onClose={closeModal} title={title}>
        {modal?.kind === "order" ? (
          <OrderInquiryForm
            crafts={crafts}
            initialCraftId={modal.craftId}
            onDone={closeModal}
          />
        ) : null}
        {modal?.kind === "class" ? (
          <ClassApplicationForm
            classes={classes}
            initialClassId={modal.classId}
            onDone={closeModal}
          />
        ) : null}
      </Modal>
    </>
  );
}

export default StudioApp;
