import './CustomImage.css';

const CustomImage = ({ image, openEvent, index }) => {
	return (
		<div className='p-2'>
			<img
				loading='eager'
				onClick={() => openEvent(index)}
				alt=''
				className='custom-img'
				src={image}
			></img>
		</div>
	);
};

export default CustomImage;
