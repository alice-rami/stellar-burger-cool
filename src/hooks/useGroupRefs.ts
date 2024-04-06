import { useCallback, useMemo, useRef, useState } from 'react';
import { TabId } from '../components/ui/tabs-mobile/config';
import { Ref } from '../components/ui/tabs-mobile/component';

export function useGroupRefs() {
  const [visibleGroup, setVisibleGroup] = useState<TabId>('one');

  const groupRefs = useRef<Ref>();

  const intersectingSections = useMemo(
    () =>
      new Map<TabId, boolean>([
        ['one', false],
        ['two', false],
        ['three', false],
      ]),
    []
  );

  const sectionObserver = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            intersectingSections.set(
              entry.target.id as TabId,
              entry.isIntersecting
            );
          });
          const currentSection = Array.from(
            intersectingSections.entries()
          ).find((entry) => entry[1] === true);
          if (currentSection && currentSection.length > 0) {
            setVisibleGroup(currentSection[0]);
          }
        },
        { rootMargin: '-350px 0px 0px' }
      ),
    [intersectingSections]
  );

  const setSectionRefs = useCallback(
    (node: HTMLElement) => {
      if (node) {
        groupRefs.current = { ...groupRefs.current, [node.id]: node };
        sectionObserver.observe(node);
      }
    },
    [sectionObserver]
  );

  return { visibleGroup, groupRefs, setSectionRefs };
}
