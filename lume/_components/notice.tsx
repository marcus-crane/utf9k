export default ({ emoji, title, children }) => (
  <div class="notice">
    <hr class="hidden" />
    <h3>
      {emoji && <span>{emoji}</span>}
      {title}
    </h3>
    {children}
    <hr class="hidden" />
  </div>
);
