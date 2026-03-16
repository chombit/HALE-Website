import "./MapContainer.css"
export default function MapContainer(){
    return(
        <div className="map-container">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.6551774765885!2d38.47063507483655!3d7.049744092952503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b1459130460b23%3A0xf81c21c1652a0e5e!2sPiassa!5e0!3m2!1sen!2set!4v1724483750107!5m2!1sen!2set" allowfullscreen="" loading="lazy" title="Location" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    )
}