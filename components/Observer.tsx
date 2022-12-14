import { useEffect, useRef } from 'react';
type Props = {
  onObserved: () => void;
  children: React.ReactNode;
};

const Observer = ({ onObserved, children }: Props) => {
  const eleToWatch = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const curIntersecton = entries.filter(
          (e) => e.target === eleToWatch.current
        )[0];
        if (
          curIntersecton &&
          curIntersecton.isIntersecting &&
          curIntersecton.intersectionRatio > 0.7
        ) {
          onObserved();
        }
      },
      {
        threshold: 0.5,
        rootMargin: '1500px',
      }
    );
    if (eleToWatch.current) observer.observe(eleToWatch.current);
    return () => {
      observer.disconnect();
    };
  }, []);
  // TODO: 스크롤시 생성된 아이템의 전체 높이를 ref로 사용해야
  // intersectionRatio를 사용 할 수 있다.
  // "현재는 rootMargin을 높게주어 적용"
  // pc: 12722px / mobile(min:375): 3450px 그리드 높이
  return <span ref={eleToWatch}>{children}</span>;
};

export default Observer;
