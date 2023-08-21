const StepsSection = (): JSX.Element => {
  return (
    <div className="steps">
      <h1>Less decision making. More vacation taking.</h1>

      <p>
        Thatch travel creators have packaged their insider knowledge into ready-to-book trips you
        can easily personalize - so planning a great trip can feel less stressful.
      </p>

      <div className="steps-visuals">
        <div className="steps-visualsone">
          <p>Step 01</p>
          <h3>
            Browse, bookmark, and <i>buy trip plans.</i>
          </h3>
          <div>
            <img src="assets/images/steps-section/image-1.webp" alt="" />
          </div>
        </div>

        <div className="steps-visualstwo">
          <p>Step 02</p>
          <h3>
            Browse, bookmark, and <i>buy trip plans.</i>
          </h3>
          <div>
            <img src="assets/images/steps-section/image-2.webp" alt="" />
          </div>
        </div>

        <div className="steps-visualsthree">
          <p>Step 03</p>
          <h3>
            Browse, bookmark, and <i>buy trip plans.</i>
          </h3>
          <div>
            <img src="assets/images/steps-section/image-3.webp" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsSection;
