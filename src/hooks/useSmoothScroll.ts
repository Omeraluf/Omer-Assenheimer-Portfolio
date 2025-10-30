export const useSmoothScroll = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });

    // clean the URL (remove #hash)
    window.history.replaceState(null, "", " ");
  };

  return scrollTo;
};
