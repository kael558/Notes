import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiImage, FiFileText, FiCheck, FiEdit2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface TextChunk {
	id: string;
	content: string;
}

function Upload() {
	const [uploadType, setUploadType] = useState<'image' | 'text' | null>(null);
	const [images, setImages] = useState<File[]>([]);
	const [ocrTexts, setOcrTexts] = useState<string[]>([]);
	const [textInput, setTextInput] = useState<string>('');
	const [chunks, setChunks] = useState<TextChunk[]>([]);
	const [step, setStep] = useState(1);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setImages(acceptedFiles);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/*': ['.jpeg', '.jpg', '.png']
		}
	});

	const handleOCRProcess = async () => {
		// Mock OCR API call
		const mockTexts = images.map(() => "Sample OCR text...");
		setOcrTexts(mockTexts);
		setStep(3);
	};

	const handleTextConfirmation = async () => {
		// Mock API call to process texts
		const mockChunks = ocrTexts.map((text, index) => ({
			id: `chunk-${index}`,
			content: text
		}));
		setChunks(mockChunks);
		setStep(5);
	};

	const handleFinalSubmission = async () => {
		// Mock final submission
		alert("Successfully uploaded! Happy Birthday Mom! 🎉");
		setStep(1);
		setUploadType(null);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
			<div className="max-w-4xl mx-auto">
				<h2 className="text-3xl font-bold text-center mb-8 text-purple-800">
					Upload Your Notes 💝
				</h2>

				{!uploadType && (
					<div className="grid grid-cols-2 gap-6">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all"
							onClick={() => setUploadType('image')}
						>
							<FiImage className="w-12 h-12 mx-auto mb-4 text-purple-600" />
							<h3 className="text-xl font-semibold text-center">Upload Images</h3>
						</motion.button>

						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all"
							onClick={() => setUploadType('text')}
						>
							<FiFileText className="w-12 h-12 mx-auto mb-4 text-purple-600" />
							<h3 className="text-xl font-semibold text-center">Upload Text</h3>
						</motion.button>
					</div>
				)}

				{uploadType === 'image' && (
					<div className="bg-white rounded-xl p-8 shadow-lg">
						{step === 1 && (
							<div
								{...getRootProps()}
								className={`border-2 border-dashed border-purple-300 rounded-xl p-8 text-center cursor-pointer
                  ${isDragActive ? 'bg-purple-50' : 'bg-white'}`}
							>
								<input {...getInputProps()} />
								<FiUploadCloud className="w-16 h-16 mx-auto mb-4 text-purple-400" />
								<p className="text-gray-600">Drag & drop images here, or click to select files</p>
								{images.length > 0 && (
									<div className="mt-4">
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleOCRProcess();
											}}
											className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
										>
											Process {images.length} images
										</button>
									</div>
								)}
							</div>
						)}

						{step === 3 && (
							<div className="space-y-6">
								<h3 className="text-xl font-semibold mb-4">Confirm Extracted Text</h3>
								{ocrTexts.map((text, index) => (
									<div key={index} className="bg-gray-50 p-4 rounded-lg">
										<textarea
											value={text}
											onChange={(e) => {
												const newTexts = [...ocrTexts];
												newTexts[index] = e.target.value;
												setOcrTexts(newTexts);
											}}
											className="w-full p-2 border rounded"
											rows={4}
										/>
									</div>
								))}
								<button
									onClick={handleTextConfirmation}
									className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
								>
									Confirm Texts
								</button>
							</div>
						)}
					</div>
				)}

				{uploadType === 'text' && (
					<div className="bg-white rounded-xl p-8 shadow-lg">
						<textarea
							value={textInput}
							onChange={(e) => setTextInput(e.target.value)}
							className="w-full p-4 border rounded-lg mb-4"
							rows={8}
							placeholder="Enter your text here..."
						/>
						<button
							onClick={() => {
								setOcrTexts([textInput]);
								setStep(5);
							}}
							className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
						>
							Process Text
						</button>
					</div>
				)}

				{step === 5 && (
					<div className="bg-white rounded-xl p-8 shadow-lg">
						<h3 className="text-xl font-semibold mb-4">Confirm Final Chunks</h3>
						{chunks.map((chunk) => (
							<div key={chunk.id} className="mb-4 bg-gray-50 p-4 rounded-lg">
								<textarea
									value={chunk.content}
									onChange={(e) => {
										const newChunks = chunks.map(c =>
											c.id === chunk.id ? { ...c, content: e.target.value } : c
										);
										setChunks(newChunks);
									}}
									className="w-full p-2 border rounded"
									rows={4}
								/>
							</div>
						))}
						<button
							onClick={handleFinalSubmission}
							className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
						>
							Submit All
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Upload;