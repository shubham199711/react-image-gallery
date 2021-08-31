import ImageViewer from 'react-simple-image-viewer';
import InfiniteScroll from 'react-infinite-scroll-component';
import CustomImage from '../image/CustomImage';

const ImageGallery = ({
	allImages,
	fetchMoreData,
	isHasMore,
	openImageViewer,
	isViewerOpen,
	currentImage,
	closeImageViewer,
}) => {
	return (
		<section className='app-gallery mt-5'>
			<InfiniteScroll
				dataLength={allImages.length}
				next={fetchMoreData}
				hasMore={isHasMore}
				loader={<h4>Loading...</h4>}
			>
				<div className='row p-0 m-0'>
					{(allImages || []).map((image, index) => {
						return (
							<div
								key={index}
								className='col-lg-4 col-md-6 col-12'
							>
								<CustomImage
									image={image}
									openEvent={openImageViewer}
									index={index}
								></CustomImage>
							</div>
						);
					})}

					{isViewerOpen && (
						<ImageViewer
							src={allImages}
							currentIndex={currentImage}
							onClose={closeImageViewer}
							disableScroll={true}
							backgroundStyle={{
								backgroundColor: 'rgba(0,0,0,0.9)',
							}}
						/>
					)}
				</div>
			</InfiniteScroll>
		</section>
	);
};

export default ImageGallery;
