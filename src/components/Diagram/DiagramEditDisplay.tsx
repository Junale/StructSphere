const DiagramEditDisplay = () => {
	const handleRelationshipChange = (
		e: React.MouseEvent<HTMLSelectElement, MouseEvent>,
	) => {
		const updatedRelation = Number(e.currentTarget.value);
		const existingRelationship = relationshipIds.find(
			(id) => id === updatedRelation,
		);
		console.log(relationshipIds);
		if (!existingRelationship) {
			onNewRelationship(component.id, updatedRelation);
		} else {
			onRemoveRelationship(component.id, updatedRelation);
		}
	};
	return (
		<div>
			<div className="flex">
				<label htmlFor="relations">Relations: </label>
				<select
					defaultValue={relationshipIds.map(toString)}
					name="relations"
					id="relations"
					onClick={handleRelationshipChange}
					multiple
				>
					{siblings.map((sibling) => (
						<option key={sibling.id} value={sibling.id}>
							{sibling.title}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default DiagramEditDisplay;
