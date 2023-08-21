const CallToAction = (): JSX.Element => {
  return (
    <div className="calltoaction">
      <div className="calltoaction-firstrow">
        <img src="assets/images/call-to-action/image-1.webp" alt="" />
        <img src="assets/images/call-to-action/image-2.webp" alt="" />
        <img src="assets/images/call-to-action/image-3.webp" alt="" />
        <img src="assets/images/call-to-action/image-4.webp" alt="" />
      </div>

      <div className="calltoaction-middlerow">
        <img src="assets/images/call-to-action/image-5.webp" alt="" />

        <div>
          <h1>Become a travel creator.</h1>

          <p>
            If you&apos;re passionate about sharing your travel knowledge, Thatch makes it easy to
            organize, curate, share and monetize all your recs - all in one place.
          </p>

          <button>Learn More</button>
        </div>

        <img src="assets/images/call-to-action/image-6.webp" alt="" />
      </div>

      <div className="calltoaction-lastrow">
        <img src="assets/images/call-to-action/image-7.webp" alt="" />
        <img src="assets/images/call-to-action/image-8.webp" alt="" />
        <img src="assets/images/call-to-action/image-9.webp" alt="" />
        <img src="assets/images/call-to-action/image-10.webp" alt="" />
      </div>
    </div>
  );
};

export default CallToAction;
