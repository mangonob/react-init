export function jumpToErrorOccurTabIfNeeded(
  tabElement: Element,
  activeKey: string,
  setActiveKey: (_: string) => void,
  onFinished?: () => void
) {
  requestIdleCallback(() => {
    const tabPanels = Array.from(
      tabElement.querySelectorAll(
        ':scope > .ant-tabs-content-holder > .ant-tabs-content > .ant-tabs-tabpane'
      )
    );

    if (tabPanels.length === 0) {
      console.warn('tab pannels not found in', tabElement);
    }

    const hasError = (e: Element) =>
      e.querySelector('.ant-form-item-explain-error');

    const errorOccurTabs = tabPanels.filter((p) => hasError(p));

    const errorOccurTabKeys = errorOccurTabs.flatMap((p) => {
      const tabPanelIdPattern = /rc-tabs-1-panel-(\w+)/g;
      if (p.id) {
        const exec = tabPanelIdPattern.exec(p.id);
        const key = exec?.[1];
        return key ? [key] : [];
      }
      return [];
    });

    if (
      errorOccurTabKeys.length > 0 &&
      !errorOccurTabKeys.includes(activeKey)
    ) {
      setActiveKey(errorOccurTabKeys[0]);
    }

    onFinished?.();
  });
}
