"""
FiftyOne dataset types.

| Copyright 2017-2020, Voxel51, Inc.
| `voxel51.com <https://voxel51.com/>`_
|
"""
# pragma pylint: disable=redefined-builtin
# pragma pylint: disable=unused-wildcard-import
# pragma pylint: disable=wildcard-import
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals
from builtins import *

# pragma pylint: enable=redefined-builtin
# pragma pylint: enable=unused-wildcard-import
# pragma pylint: enable=wildcard-import


class Dataset(object):
    """Abstract base type for datasets."""

    pass


class UnlabeledDataset(Dataset):
    """Abstract type representing an unlabeled collection of data samples."""

    pass


class UnlabeledImageDataset(UnlabeledDataset):
    """Abstract type representing an unlabeled collection of images."""

    pass


class LabeledDataset(Dataset):
    """Abstract type representing a collection of data samples and their
    associated labels.
    """

    pass


class LabeledImageDataset(LabeledDataset):
    """Abstract type representing a collection of images and their associated
    labels.
    """

    pass


class ImageClassificationDataset(LabeledImageDataset):
    """A labeled dataset consisting of images and their associated
    classification labels.

    FiftyOne exports datasets of this type on disk in the following format::

        <dataset_dir>/
            data/
                <uuid1>.<ext>
                <uuid2>.<ext>
                ...
            labels.json

    where ``labels.json`` is a JSON file in the following format::

        {
            "classes": [
                <labelA>,
                <labelB>,
                ...
            ],
            "labels": {
                <uuid1>: <target1>,
                <uuid2>: <target2>,
                ...
            }
        }

    If the ``classes`` field is provided, the ``target`` values are class IDs
    that are mapped to class label strings via ``classes[target]``. If no
    ``classes`` field is provided, then the ``target`` values directly store
    the label strings.
    """

    pass


class ImageDetectionDataset(LabeledImageDataset):
    """A labeled dataset consisting of images and their associated object
    detections.

    FiftyOne exports datasets of this type on disk in the following format::

        <dataset_dir>/
            data/
                <uuid1>.<ext>
                <uuid2>.<ext>
                ...
            labels.json

    where ``labels.json`` is a JSON file in the following format::

        {
            "classes": [
                <labelA>,
                <labelB>,
                ...
            ],
            "labels": {
                <uuid1>: [
                    {
                        "label": <target>,
                        "bounding_box": [
                            <top-left-x>, <top-left-y>, <width>, <height>
                        ],
                        "confidence": <optional-confidence>,
                    },
                    ...
                ],
                <uuid2>: [
                    ...
                ],
                ...
            }
        }

    and where the bounding box coordinates are expressed as relative values in
    ``[0, 1] x [0, 1]``.

    If the ``classes`` field is provided, the ``target`` values are class IDs
    that are mapped to class label strings via ``classes[target]``. If no
    ``classes`` field is provided, then the ``target`` values directly store
    the label strings.
    """

    pass


class COCODetectionDataset(LabeledImageDataset):
    """A labeled dataset consisting of images and their associated object
    detections saved in COCO format.

    FiftyOne exports datasets of this type on disk in the following format::

        <dataset_dir>/
            data/
                <file_name0>
                <file_name1>
                ...
            labels.json

    where ``labels.json`` is a JSON file in the following format::

        {
            "info": {...},
            "licenses": [],
            "categories": [
                ...
                {
                    "id": 2,
                    "name": "cat",
                    "supercategory": "none"
                },
                ...
            ],
            "images": [
                {
                    "id": 0,
                    "license": null,
                    "file_name": <file_name0>,
                    "height": 480,
                    "width": 640,
                    "date_captured": null
                }
            ],
            "annotations": [
                {
                    "id": 0,
                    "image_id": 0,
                    "category_id": 2,
                    "bbox": [260, 177, 231, 199],
                    "area": 45969,
                    "segmentation": [],
                    "iscrowd": 0
                },
                ...
            ]
        }
    """

    pass


class ImageLabelsDataset(LabeledImageDataset):
    """A labeled dataset consisting of images and their associated multitask
    predictions stored in ``eta.core.image.ImageLabels`` format.

    FiftyOne exports datasets of this type on disk in the following format::

        <dataset_dir>/
            data/
                <uuid1>.<ext>
                <uuid2>.<ext>
                ...
            labels/
                <uuid1>.json
                <uuid2>.json
                ...
            manifest.json

    where ``manifest.json`` is a JSON file in the following format::

        {
            "type": "eta.core.datasets.LabeledImageDataset",
            "description": "",
            "index": [
                {
                    "data": "data/<uuid1>.<ext>",
                    "labels": "labels/<uuid1>.json"
                },
                ...
            ]
        }

    and where each labels JSON file is stored in ``eta.core.image.ImageLabels``
    format. See https://voxel51.com/docs/api/#types-imagelabels for more
    details.
    """

    pass
