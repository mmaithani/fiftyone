FiftyOne Release Notes
======================

.. default-role:: code
.. include:: substitutions.rst

FiftyOne 0.5.1
--------------
*Released August 18, 2020*

App
^^^
- Statistics in the display options sidebar now reflect the current
  :ref:`view <using-views>`, not the entire :ref:`dataset <using-datasets>`
- Improved image tiling algorithm that prevents single images from filling an
  entire grid row
- Added support for toggling label visibility within the expanded sample modal
- Improved display of long label and tag names throughout the app
- Enhanced view bar functionality, including keyword arguments, type
  annotations, error messages, help links, and overall stability improvements
- Added keyboard shortcuts for interacting with the view bar:
   - `DEL` and `BACKSPACE` delete the raised (active) stage
   - `ESC` toggles focus on the ViewBar, which activates shortcuts
   - `TAB`, `ENTER`, and `ESC` submits stage input fields
   - `LEFT` and `RIGHT ARROW` traverses view stages and add-stage buttons
   - `SHIFT + LEFT ARROW` and `SHIFT + RIGHT ARROW` traverse stages

Core
^^^^
- Greatly improved the performance of loading dataset samples from the database
- Added support for :meth:`renaming <fiftyone.core.dataset.Dataset.name>` and
  :meth:`cloning <fiftyone.core.dataset.Dataset.clone>` datasets
- Added more string matching operations when
  :ref:`querying samples <querying-samples>`, including
  :meth:`starts_with() <fiftyone.core.expressions.ViewExpression.starts_with>`,
  :meth:`ends_with() <fiftyone.core.expressions.ViewExpression.ends_with>`,
  :meth:`contains_str() <fiftyone.core.expressions.ViewExpression.contains_str>` and
  :meth:`matches_str() <fiftyone.core.expressions.ViewExpression.matches_str>`

Documentation
^^^^^^^^^^^^^
- Added :doc:`a tutorial </tutorials/open_images_evaluation>` demonstrating
  performing error analysis on the
  `Open Images Dataset <https://storage.googleapis.com/openimages/web/index.html>`_
  powered by FiftyOne

FiftyOne 0.5.0
--------------
*Released August 11, 2020*

Announcements
^^^^^^^^^^^^^
- FiftyOne is now open source! Read more about this exciting development
  `in our press release <https://voxel51.com/press/fiftyone-open-source-launch>`_

App
^^^
- Major design refresh, including a
  `new look-and-feel for the App <https://voxel51.com/docs/fiftyone/_static/images/release-notes/v050_release_app.png>`_
- Added view bar that supports constructing dataset views directly in the App
- Redesigned expanded sample view:
    - Improved look-and-feel, with modal-style form factor
    - Added support for maximizing the media player
    - Added support for maximizing the raw sample view
    - Added arrow controls to navigate between samples

Core
^^^^
- Added support for :ref:`importing <FiftyOneDataset-import>` and
  :ref:`exporting <FiftyOneDataset-export>` FiftyOne datasets via the
  :class:`FiftyOneDataset <fiftyone.types.dataset_types.FiftyOneDataset>` type
- Added a :meth:`Dataset.info <fiftyone.core.dataset.Dataset.info>` field that
  can be used to store dataset-level info in FiftyOne datasets
- Added a :meth:`shuffle() <fiftyone.core.collections.SampleCollection.shuffle>`
  view stage for randomly shuffling the samples in a dataset
- Upgraded the :meth:`take() <fiftyone.core.collections.SampleCollection.take>`
  view stage so that each instance of a view maintains a deterministic set of
  samples

FiftyOne 0.4.1
--------------
*Released August 4, 2020*

Core
^^^^
- Added a powerful :mod:`fiftyone.core.expressions` module for constructing
  complex DatasetView :meth:`match() <fiftyone.core.collections.SampleCollection.match>`,
  :meth:`filter_classifications() <fiftyone.core.collections.SampleCollection.filter_classifications>`,
  :meth:`filter_detections() <fiftyone.core.collections.SampleCollection.filter_detections>`, and
  :meth:`sort_by() <fiftyone.core.collections.SampleCollection.sort_by>` stages
- Added an
  :meth:`evaluate_detections() <fiftyone.utils.eval.coco.evaluate_detections>`
  utility for evaluating object detections in FiftyOne datasets
- Adding support for rendering annotated versions of sample data with their
  labels overlaid via a
  :meth:`draw_labels() <fiftyone.core.collections.SampleCollection.draw_labels>`
  method

Documentation
^^^^^^^^^^^^^
- Added :doc:`a tutorial </tutorials/evaluate_detections>` demonstrating
  object detection evaluation workflows powered by FiftyOne
- Added :doc:`full documentation </user_guide/using_views>` for constructing
  DatasetViews with powerful matching, filtering, and sorting operations
- Added :doc:`a recipe </recipes/draw_labels>` showing how to render annotated
  versions of samples with label field(s) overlaid
- Upgraded :doc:`dataset creation docs </user_guide/dataset_creation/index>`
  that simplify the material and make it easier to find the creation strategy
  of interest
- Improved layout of :doc:`tutorials </tutorials/index>`,
  :doc:`recipes </recipes/index>`, and :doc:`user guide </user_guide/index>`
  landing pages

FiftyOne 0.4.0
--------------
*Released July 21, 2020*

Core
^^^^
- Added support for importing datasets in custom formats via the
  |DatasetImporter| interface
- Added support for exporting datasets to disk in custom formats via the
  |DatasetExporter| interface
- Added support for parsing individual elements of samples in the
  |SampleParser| interface
- Added an option to image loaders in :mod:`fiftyone.utils.torch` to convert
  images to RGB
- Fixed an issue where
  :meth:`Dataset.delete_sample_field() <fiftyone.core.dataset.Dataset.delete_sample_field>`
  would not permanently delete fields if they were modified after deletion
- Improved the string representation of |ViewStage| instances

App
^^^
- Fixed an issue that could cause launching the App to fail on Windows under
  Python 3.6 and older

Documentation
^^^^^^^^^^^^^
- Added a recipe demonstrating how to
  :doc:`convert datasets </recipes/convert_datasets>` on disk between common
  formats
- Added recipes demonstratings how to write your own
  :doc:`custom dataset importers </recipes/custom_importer>`,
  :doc:`custom dataset exporters </recipes/custom_exporter>`, and
  :doc:`custom sample parsers </recipes/custom_parser>`
- Added a :doc:`Configuring FiftyOne </user_guide/config>` page to the User
  Guide that explains how to customize your FiftyOne Config

FiftyOne 0.3.0
--------------
*Released June 24, 2020*

Core
^^^^
- Added support for importing and exporting datasets in several common formats:
    - COCO: :class:`COCODetectionDataset <fiftyone.types.dataset_types.COCODetectionDataset>`
    - VOC: :class:`VOCDetectionDataset <fiftyone.types.dataset_types.VOCDetectionDataset>`
    - KITTI: :class:`KITTIDetectionDataset <fiftyone.types.dataset_types.KITTIDetectionDataset>`
    - Image classification TFRecords:
      :class:`TFImageClassificationDataset <fiftyone.types.dataset_types.TFImageClassificationDataset>`
    - TF Object Detection API TFRecords:
      :class:`TFObjectDetectionDataset <fiftyone.types.dataset_types.TFObjectDetectionDataset>`
    - CVAT image: :class:`CVATImageDataset <fiftyone.types.dataset_types.CVATImageDataset>`
    - Berkeley DeepDrive: :class:`BDDDataset <fiftyone.types.dataset_types.BDDDataset>`
- Added :meth:`Dataset.add_dir() <fiftyone.core.dataset.Dataset.add_dir>` and
  :meth:`Dataset.from_dir() <fiftyone.core.dataset.Dataset.from_dir>` to allow
  for importing datasets on disk in any supported format
- Added a :meth:`convert_dataset() <fiftyone.utils.data.converters.convert_dataset>`
  method to convert between supported dataset formats
- Added support for downloading COCO 2014/2017 through the FiftyOne Dataset Zoo
  via the Torch backend

App
^^^
- Fixed an issue that could prevent the App from connecting to the FiftyOne
  backend

CLI
^^^
- Added `fiftyone convert` to convert datasets on disk between any supported
  formats
- Added `fiftyone datasets head` and `fiftyone datasets tail` to print the
  head/tail of datasets
- Added `fiftyone datasets stream` to stream the samples in a dataset to the
  terminal with a `less`-like interface
- Added `fiftyone datasets export` to export datasets in any available format

FiftyOne 0.2.1
--------------
*Released June 19, 2020*

Core
^^^^
- Added preliminary Windows support
- :meth:`Dataset.add_images_dir() <fiftyone.core.dataset.Dataset.add_images_dir>`
  now skips non-images
- Improved performance of adding samples to datasets

CLI
^^^
- Fixed an issue that could cause port forwarding to hang when initializing a
  remote session

FiftyOne 0.2.0
--------------
*Released June 12, 2020*

Core
^^^^
- Added support for persistent datasets
- Added a class-based view stage approach via the |ViewStage| interface
- Added support for serializing collections as JSON and reading datasets from
  JSON
- Added support for storing numpy arrays in samples
- Added a config option to control visibility of progress bars
- Added progress reporting to
  :meth:`Dataset.add_samples() <fiftyone.core.dataset.Dataset.add_samples>`
- Added a :meth:`SampleCollection.compute_metadata() <fiftyone.core.collections.SampleCollection.compute_metadata>`
  method to enable population of the `metadata` fields of samples
- Improved reliability of shutting down the App and database services
- Improved string representations of |Dataset| and |Sample| objects

App
^^^
- Added distribution graphs for label fields
- Fixed an issue causing cached images from previously-loaded datasets to be
  displayed after loading a new dataset

CLI
^^^
- Added support for creating datasets and launching the App
