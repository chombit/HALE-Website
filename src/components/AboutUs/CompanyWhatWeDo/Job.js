import "./Job.css";
export default function Job({
  name = "Job Name",
  description = "Job Description",
  image,
}) {
  return (
    <div className="job">
      <img src={image} alt="" />
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
